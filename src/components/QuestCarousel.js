import { create } from 'zustand';

const useQuestStore = create((set) => ({
  activeIndex: 0,
  questData: [
    {
    title: "A Merchant's Misfortune",
    description: 'Rank: C | Deadline: 27th of Alturiak, “Claw of Winter” ',
    description1: 'A traveling merchant was ambushed by bandits along the King’s Road, losing both his wares and his guards. Recover his stolen goods and, if possible, make sure the scoundrels regret their deeds.',
    image: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2024/11/untitled-design-22.jpg?q=49&fit=crop&w=825&dpr=2',
  },
  {
    title: 'Ale and Antics',
    description: 'Rank: D/Deadline: 3rd of Ches, "The Claw of Sunsets" ',
    description1: 'The local tavern is in dire need of a bard for their festival, but none have answered the call. If ye have a way with song or tale, come forth and earn a handsome reward in coin and cheer! ',
    image: 'https://www.telegraph.co.uk/content/dam/gaming/2018/09/18/The-Bards-Tale-game_trans_NvBQzQNjv4BqNJjoeBT78QIaYdkJdEY4CnGTJFJS74MYhNY6w3GNbO8.jpg?imwidth=1920',
  },
  {
    title: 'Escort the Arcane',
    description: 'Rank: B/Deadline: 15th of Ches, "The Claw of Sunsets" ',
    description1: 'A reclusive wizard seeks safe passage through the Cragspire Cliffs. Guard him well-his mind holds secrets that many would kill to steal.',
    image: 'https://i.redd.it/u93tgdewdpnd1.jpeg',
  },
  {
    title: 'Plague Rats of the Undercity',
    description: 'Rank: D/Deadline: 24th of Alturiak, "Claw of Winter" ',
    description1: 'The city sewers have become infested with giant rats carrying a vile sickness. Clear them out before the plague spreads to the surface. ',
    image: 'https://www.enworld.org/attachments/city-sewer_low-glazed-intensity9-render4-v1-png.375460/',
  },
  ],
  setActiveIndex: (index) => set({ activeIndex: index }),
}));

export default useQuestStore;