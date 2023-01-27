Hooks.on('diceSoNiceReady', async(dice3d) => {
  await Promise.all([
   ]);


  dice3d.addColorset({
    name: 'Dotty',
    description: "📱 Dotty",
    category: "dice-addiction-v2",
    texture: 'DoYouSeeTheDots',
    foreground: '#CAC6BC',
    background: "#A17E8F",
    outline: '#689F8E',
    edge: '#A0B776',
    material: 'metal',
    font: '📱 Iceberg',
    fontScale: { "d6": 1.1, "df": 2.5 },
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'bigEye',
    description: "📱 Big Eye",
    category: "dice-addiction-v2",
    texture: 'bigEyeGrayscale',
    foreground: '#E2C115',
    background: "#391740",
    outline: '#C12338',
    edge: '#329FAA',
    material: 'metal',
    font: '📱 Iceberg',
    fontScale: { "d6": 1.1, "df": 2.5 },
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'gjade',
    description: "📱 Golden-Jade",
    category: "dice-addiction-v2",
    foreground: '#9F8003',
    background: "#039f32",
    texture: 'Duality',
    edge: '#9F8003',
    material: 'metal',
    font: '📱 Jade',
    fontScale: {
      "d6": 1.1,
      "df": 2.5
    },
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'DarkWood',
    description: "📱 Dark Wood",
    category: "dice-addiction-v2",
    texture: 'Mahagoni',
    foreground: '#382600',
    background: "#2d1301",
    outline: '#563201',
    edge: '#1f1200',
    material: 'wood',
    font: '📱 Lumber',
    fontScale: {
      "d6": 1.1,
      "df": 2.5
    },
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Burn',
    description: "📱 Burn",
    category: "dice-addiction-v2",
    texture: 'BurningHell',
    foreground: '#ffffff',
    background: "#ff4000",
    outline: '#ff8800',
    edge: '#cc7700',
    material: 'metal',
    font: '📱 Fire',
    fontScale: {
      "d6": 1.1,
      "df": 2.5
    },
    visibility: 'visible'
  }, "default");

  dice3d.addColorset({
    name: 'GreenGalaxy',
    description: "📱 GreenGalaxy",
    category: "dice-addiction-v2",
    texture: 'Galaxy',
    foreground: '#404040',
    background: "#2cba5d",
    outline: '#ffffff',
    edge: '#094d00',
    material: 'metal',
    font: 'American Typewriter',
    fontScale: {
      "d6": 1.1,
      "df": 2.5
    },
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'FrostyCrystal',
    description: "📱 FrostyCrystal",
    category: "dice-addiction-v2",
    texture: 'DarkCrystal',
    foreground: '#FFFFFF',
    background: "#0150b7",
    outline: '#28cacc',
    edge: '#28b4cc',
    material: 'metal',
    font: 'American Typewriter',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Duality',
    description: "📱 Duality (Red/Blue)",
    category: "dice-addiction-v2",
    texture: 'Duality',
    foreground: '#ffffff',
    background: "#ffffff",
    outline: '#ffffff',
    edge: '#ffffff',
    material: 'metal',
    font: '📱 Lumber',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Duality-2',
    description: "📱 Duality (Red/Green)",
    category: "dice-addiction-v2",
    texture: 'Duality2',
    foreground: '#00ff2a',
    background: "#ceff47",
    outline: '#ffffff',
    edge: '#2bff00',
    material: 'metal',
    font: '📱 Lumber',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Duality-3',
    description: "📱 Duality (Green)",
    category: "dice-addiction-v2",
    texture: 'Duality3',
    foreground: '#ffffff',
    background: "#61ff9e",
    outline: '#61ff9e',
    edge: '#61ff9e',
    material: 'metal',
    font: '📱 Lumber',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'GreenCloud',
    description: "📱 GreenCloud",
    category: "dice-addiction-v2",
    texture: 'Dark_Cloudy',
    foreground: '#00ff33',
    background: "#00ff33",
    outline: '#e1ff00',
    edge: '#e1ff00',
    material: 'metal',
    font: 'Arial',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'YellowRavine',
    description: "📱 YellowRavine",
    category: "dice-addiction-v2",
    texture: 'GreenRavine',
    foreground: '#665500',
    background: "#141414",
    outline: '#ffffff',
    edge: '#ffee00',
    material: 'metal',
    font: 'Arial',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Bloodlines',
    description: "📱 Bloodlines",
    category: "dice-addiction-v2",
    texture: 'BigSparks',
    foreground: '#660000',
    background: "#3d0000",
    outline: '#ffffff',
    edge: '#ff0000',
    material: 'metal',
    font: '📱 Immortal',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Necromancer',
    description: "📱 Necromancer",
    category: "dice-addiction-v2",
    texture: 'DarkCrystal',
    foreground: '#080808',
    background: "#310707",
    outline: '#ff0000',
    edge: '#000000',
    material: 'metal',
    font: '📱 Horror',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Fabulous Fire',
    description: "📱 Fabulous Fire",
    category: "dice-addiction-v2",
    texture: 'FabulousFire',
    foreground: '#ffae00',
    background: "#ffd500",
    outline: '#ff9500',
    edge: '#ffffff',
    material: 'metal',
    font: '📱 Forest2',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Fabulous Fire',
    description: "📱 Fabulous Fire",
    category: "dice-addiction-v2",
    texture: 'FabulousFire',
    foreground: '#ffae00',
    background: "#ffd500",
    outline: '#ff9500',
    edge: '#ffffff',
    material: 'metal',
    font: '📱 Forest2',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Fabulous Fire',
    description: "📱 Fabulous Fire",
    category: "dice-addiction-v2",
    texture: 'FabulousFire',
    foreground: '#ffae00',
    background: "#ffd500",
    outline: '#ff9500',
    edge: '#ffffff',
    material: 'metal',
    font: '📱 Forest2',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'FluffyCloud',
    description: "📱 Fluffy Cloud",
    category: "dice-addiction-v2",
    texture: 'FluffyClouds',
    foreground: '#002738',
    background: "#ffffff",
    outline: '#ffffff',
    edge: '#ffffff',
    material: 'metal',
    font: '📱 Air',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Pirate',
    description: "📱 Pirate",
    category: "dice-addiction-v2",
    texture: 'CarvedWood',
    foreground: '#FFFFFF',
    background: "#757575",
    outline: '#6a3401',
    edge: '#6a3401',
    material: 'wood',
    font: '📱 Pirates',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Frozen Lake',
    description: "📱 Frozen Lake",
    category: "dice-addiction-v2",
    texture: 'FrozenLake',
    foreground: '#FFFFFF',
    background: "#3b56ba",
    outline: '#70fffd',
    edge: '#70fffd',
    material: 'glass',
    font: '📱 Iceberg',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'Forest',
    description: "📱 Forest",
    category: "dice-addiction-v2",
    texture: 'CarvedWood',
    foreground: '#FFFFFF',
    background: "#6ed548",
    outline: '#04ff00',
    material: 'metal',
    font: '📱 Forest2',
    visibility: 'visible'
  }, "default");
  dice3d.addColorset({
    name: 'ShadesOfMountain',
    description: "📱 Mountain",
    category: "dice-addiction-v2",
    texture: 'shadesofmountain',
    foreground: '#ff7b00',
    background: "#ffffff",
    outline: '#470000',
    edge: '#3d0000',
    material: 'glass',
    visibility: 'visible'
  }, "default");

  await Promise.all([
    dice3d.addSystem({ id: "dice-addiction-v2", name: "📱 GoldenAnvil20 (d20, 20 best)" }, false),
    dice3d.addSystem({ id: "dice-addiction-v2a", name: "📱 GoldenAnvil1 (d20, 1 best)" }, false),
    dice3d.addSystem({ id: "dice-addiction-v2answer", name: "📱 TheAnswer (d20, 20 best)" }, false),
    dice3d.addSystem({ id: "dice-addiction-v2answer2", name: "📱 TheAnswer (d20, 1 best)" }, false),
  ]);

  await Promise.all([
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        'modules/dice-addiction-v2/faces/foundrynat20.webp'
      ],
      bumpMaps: [, , , , , , , , , , , , , , , , , , ,
        "modules/dice-addiction-v2/faces/foundrynat20_bump.webp"
      ],
      system: "dice-addiction-v2"
    }),
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        'modules/dice-addiction-v2/faces/foundrynat20.webp', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20'
      ],
      bumpMaps: ["modules/dice-addiction-v2/faces/foundrynat20_bump.webp", , , , , , , , , , , , , , , , , , ,
      ],
      system: "dice-addiction-v2a"
    }),
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        'modules/dice-addiction-v2/faces/the_answer_to_all.webp'
      ],
      bumpMaps: [, , , , , , , , , , , , , , , , , , ,
        "modules/dice-addiction-v2/faces/the_answer_to_all_bump.webp"
      ],
      system: "dice-addiction-v2answer"
    }),
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        'modules/dice-addiction-v2/faces/the_answer_to_all.webp', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20'
      ],
      bumpMaps: ["modules/dice-addiction-v2/faces/the_answer_to_all_bump.webp", , , , , , , , , , , , , , , , , , ,
      ],
      system: "dice-addiction-v2answer2"
    }),
  ]);
});