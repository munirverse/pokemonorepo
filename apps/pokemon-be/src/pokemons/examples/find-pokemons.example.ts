export default {
  status: 200,
  description: 'Success Find Pokemons',
  example: {
    pagination: {
      pageNumber: 1,
      pageSize: 1,
      pageTotal: 1,
    },
    data: [
      {
        id: 25,
        name: 'pikachu',
        types: ['electric'],
        color: 'yellow',
        shape: 'quadruped',
        icon: [
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
        ],
      },
    ],
  },
};
