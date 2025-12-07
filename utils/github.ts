export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  full_name: string;
}

export interface Stats {
  languages: string[];
  projects: string[];
  minutes: string;
  hours: string;
  domain: string;
  avatarUrl: string;
}

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  return headers;
};

const inferDomain = (topLang: string): string => {
  const webLangs = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP', 'Ruby', 'Vue', 'React'];
  const dataLangs = ['Python', 'R', 'Jupyter Notebook'];
  const sysLangs = ['C', 'C++', 'Rust', 'Go', 'Assembly'];
  const mobileLangs = ['Swift', 'Kotlin', 'Dart', 'Objective-C'];

  if (webLangs.includes(topLang)) return "Web Development";
  if (dataLangs.includes(topLang)) return "AI / ML / Data Science";
  if (sysLangs.includes(topLang)) return "Systems Programming";
  if (mobileLangs.includes(topLang)) return "Mobile App Dev";
  return "Generalist";
};

const calculateMinutesCoded = (repos: GitHubRepo[]): string => {
  const avgMinutesPerRepo = 120;
  const totalMinutes = repos.length * avgMinutesPerRepo;
  return totalMinutes.toLocaleString();
};

export const fetchGitHubStats = async (username: string): Promise<Stats> => {
  const headers = getHeaders();

  const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
  
  if (!userResponse.ok) {
    throw new Error(userResponse.status === 404 ? 'User not found' : 'Error fetching user data');
  }

  const userData = await userResponse.json();
  const avatarUrl = userData.avatar_url;

  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
  
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'User not found' : 'Error fetching data');
  }

  const repos: GitHubRepo[] = await response.json();
  
  if (repos.length === 0) {
    throw new Error('No public repositories found');
  }

  const languageMap: Record<string, number> = {};
  repos.forEach((repo: GitHubRepo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });
  
  const sortedLangs = Object.entries(languageMap)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([lang]) => lang);

  const sortedProjects = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(repo => repo.name);

  const topLang = sortedLangs[0] || 'Unknown';
  const domain = inferDomain(topLang);

  const minutes = calculateMinutesCoded(repos);
  const totalMinutes = parseInt(minutes.replace(/,/g, '')) || 0;
  const hours = Math.floor(totalMinutes / 60).toLocaleString();

  return {
    languages: sortedLangs,
    projects: sortedProjects,
    minutes,
    hours,
    domain,
    avatarUrl
  };
};

