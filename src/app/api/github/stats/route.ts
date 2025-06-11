import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo') || 'auto-pilot-max';
  const owner = searchParams.get('owner') || 'legonow';
  const since = searchParams.get('since') || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    // Get commits data
    const commits = await octokit.repos.listCommits({
      owner,
      repo,
      since,
      per_page: 100,
    });

    // Get repository stats
    const repoStats = await octokit.repos.get({
      owner,
      repo,
    });

    // Get pull requests
    const pullRequests = await octokit.pulls.list({
      owner,
      repo,
      state: 'all',
      sort: 'updated',
      direction: 'desc',
      per_page: 50,
    });

    // Process team member activity
    const teamActivity = commits.data.reduce((acc: any, commit) => {
      const author = commit.author?.login || 'unknown';
      if (!acc[author]) {
        acc[author] = {
          commits: 0,
          files_changed: 0,
          additions: 0,
          deletions: 0,
          last_commit: null,
        };
      }
      acc[author].commits++;
      acc[author].last_commit = commit.commit.committer?.date;
      return acc;
    }, {});

    // Get detailed file changes for recent commits
    const detailedCommits = await Promise.all(
      commits.data.slice(0, 20).map(async (commit) => {
        const details = await octokit.repos.getCommit({
          owner,
          repo,
          ref: commit.sha,
        });
        
        const author = commit.author?.login || 'unknown';
        if (teamActivity[author]) {
          teamActivity[author].files_changed += details.data.files?.length || 0;
          teamActivity[author].additions += details.data.stats?.additions || 0;
          teamActivity[author].deletions += details.data.stats?.deletions || 0;
        }

        return {
          sha: commit.sha,
          message: commit.commit.message,
          author: author,
          date: commit.commit.committer?.date,
          files_changed: details.data.files?.length || 0,
          additions: details.data.stats?.additions || 0,
          deletions: details.data.stats?.deletions || 0,
          files: details.data.files?.map(f => ({
            filename: f.filename,
            status: f.status,
            changes: f.changes,
          })) || [],
        };
      })
    );

    // Calculate development velocity metrics
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentCommits = commits.data.filter(c => 
      new Date(c.commit.committer?.date || '') > weekAgo
    );

    const velocityMetrics = {
      commits_per_day: recentCommits.length / 7,
      active_contributors: Object.keys(teamActivity).length,
      total_files_changed: Object.values(teamActivity).reduce((sum: number, member: any) => 
        sum + member.files_changed, 0
      ),
      total_lines_changed: Object.values(teamActivity).reduce((sum: number, member: any) => 
        sum + member.additions + member.deletions, 0
      ),
      pull_requests_count: pullRequests.data.length,
      open_prs: pullRequests.data.filter(pr => pr.state === 'open').length,
    };

    // Repository insights
    const repoInsights = {
      name: repoStats.data.name,
      description: repoStats.data.description,
      language: repoStats.data.language,
      size: repoStats.data.size,
      stargazers_count: repoStats.data.stargazers_count,
      watchers_count: repoStats.data.watchers_count,
      forks_count: repoStats.data.forks_count,
      open_issues_count: repoStats.data.open_issues_count,
      created_at: repoStats.data.created_at,
      updated_at: repoStats.data.updated_at,
      pushed_at: repoStats.data.pushed_at,
    };

    return NextResponse.json({
      success: true,
      data: {
        repository: repoInsights,
        team_activity: teamActivity,
        recent_commits: detailedCommits,
        velocity_metrics: velocityMetrics,
        pull_requests: pullRequests.data.slice(0, 10).map(pr => ({
          number: pr.number,
          title: pr.title,
          state: pr.state,
          created_at: pr.created_at,
          updated_at: pr.updated_at,
          author: pr.user?.login,
          html_url: pr.html_url,
        })),
        generated_at: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch GitHub statistics',
      details: error.message,
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Webhook handler for real-time GitHub events
  try {
    const payload = await request.json();
    
    // Process different GitHub webhook events
    const event = request.headers.get('x-github-event');
    
    switch (event) {
      case 'push':
        // Track pushes and commits
        console.log('Push event:', {
          repository: payload.repository.name,
          pusher: payload.pusher.name,
          commits: payload.commits.length,
          ref: payload.ref,
        });
        break;
        
      case 'pull_request':
        // Track PR activity
        console.log('PR event:', {
          action: payload.action,
          number: payload.number,
          title: payload.pull_request.title,
          user: payload.pull_request.user.login,
        });
        break;
        
      case 'issues':
        // Track issue activity
        console.log('Issue event:', {
          action: payload.action,
          number: payload.issue.number,
          title: payload.issue.title,
          user: payload.issue.user.login,
        });
        break;
    }

    return NextResponse.json({ success: true, event_processed: event });
    
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process webhook',
    }, { status: 500 });
  }
} 