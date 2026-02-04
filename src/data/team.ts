export interface TeamMember {
  id: string;
  name: string;
  photo?: string;
  linkedin?: string;
  gradient: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Angela Felicia',
    photo: '/photos/angela-felicia.png',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: '2',
    name: 'Daniel Tong',
    photo: '/photos/daniel-tong.png',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '3',
    name: 'Elijah Zhao',
    photo: '/photos/elijah-zhao.png',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: '4',
    name: 'John Grey',
    photo: '/photos/john-grey.png',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: '5',
    name: 'Sophia Huang',
    photo: '/photos/sophia-huang.png',
    gradient: 'from-amber-500 to-orange-500',
  },
];
