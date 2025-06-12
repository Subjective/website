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
    title: 'Curriculum Cross-Modal Transfer Learning for Imagined Speech Reconstruction from sEEG',
    description:
      'A novel cross-modal transfer learning technique for reconstructing imagined speech from stereotactic EEG recordings.',
    imgSrc: '/static/images/brain.jpg',
    url: '/static/documents/curriculum-cross-modal-transfer-learning-for-imagined-speech-reconstruction-from-seeg.pdf',
  },
  {
    type: 'desc',
    title: 'Bailar Code Review',
    description:
      "A highly configurable generative AI code reviewer integrated into Amazon's internal code review system, capable of commenting feedback, refactoring code, and generating documentation.",
    imgSrc: '/static/images/amazon.png',
    url: 'https://www.amazon.com/',
  },
  {
    type: 'desc',
    title: 'OpenEXA Swap',
    description:
      'A decentralized tokenization application featuring a frontend token management client that provides users with an intuitive interface for seamless asset management.',
    imgSrc: '/static/images/openexa.png',
    url: 'https://www.openexa.ai/',
  },
  {
    type: 'desc',
    title: 'Wake and Push',
    description:
      'Winner of Best Overall @ HackPNW 2023 - A unique alarm clock app that combines a traditional alarm with a physical challenge, helping users to start their day with a burst of energy and motivation.',
    imgSrc: '/static/images/push-and-wake.png',
    url: 'https://devpost.com/software/wake-and-push',
  },
  {
    type: 'desc',
    title: 'AstroNvim',
    description:
      'Active contributor to AstroNvim, an aesthetically pleasing and feature-rich Neovim configuration that focuses on extensibility and usability.',
    imgSrc: '/static/images/astronvim.jpg',
    url: 'https://astronvim.com/',
  },
  {
    type: 'desc',
    title: 'Park Swift',
    description:
      'Submission to INRIX Amazon University Hack 2023 – Urban parking lot locator for 100+ countries with real-time tracking, hourly rates, and seamless integration with Google Maps',
    imgSrc: '/static/images/parkswift.png',
    url: 'https://devpost.com/software/parkswift',
  },
  {
    type: 'repo',
    title: 'Personal Website',
    imgSrc: '/static/images/joshblog.png',
    repo: 'website',
  },
  {
    type: 'repo',
    title: 'Text2Texture',
    imgSrc: '/static/images/text2texture.png',
    repo: 'generative-design-pipeline',
  },
  {
    type: 'repo',
    title: 'Periodic Chaos',
    imgSrc: '/static/images/periodic-chaos.png',
    repo: 'periodic-chaos',
  },
  {
    type: 'repo',
    title: 'Dotfiles',
    imgSrc: '/static/images/dotfiles.png',
    repo: 'dotfiles',
  },
  {
    type: 'repo',
    title: 'Competitive Programming Solutions',
    description:
      'A repository that contains my competitive programming solutions, written in mostly C++. The problems were taken from several competitions, including USACO, CodeForces, Kattis, and Atcoder',
    imgSrc: '/static/images/usaco.png',
    repo: 'cp',
  },
  {
    type: 'repo',
    title: 'Algorithms',
    imgSrc: '/static/images/algorithms.png',
    repo: 'cp',
  },
  {
    type: 'repo',
    title: 'Travel Journal',
    imgSrc: '/static/images/travel-journal.png',
    repo: 'travel-journal',
  },
  {
    type: 'repo',
    title: 'Meme Generator',
    imgSrc: '/static/images/meme-generator.png',
    repo: 'meme-generator',
  },
]

export default projectsData
