export interface Project {
  type: 'desc' | 'repo'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith?: string[]
}

const projectsData: Project[] = [
  {
    type: 'desc',
    title: 'Wake and Push',
    description: `Winner of Best Overall @ HackPNW 2023 - A unique alarm clock app that combines a traditional alarm with a physical challenge, helping users to start their day with a burst of energy and motivation.`,
    imgSrc: '/static/images/push-and-wake.png',
    url: 'https://devpost.com/software/wake-and-push',
  },
  {
    type: 'repo',
    title: 'Competitive Programming Solutions',
    description: `A repository that contains my competitive programming solutions, written in mostly C++. The problems were taken from several competitions, including USACO, CodeForces, Kattis, and Atcoder`,
    imgSrc: '/static/images/time-machine.jpg',
    repo: 'cp',
  },
  {
    type: 'repo',
    title: 'Personal Website',
    imgSrc: '/static/images/time-machine.jpg',
    repo: 'website',
  },
]

export default projectsData
