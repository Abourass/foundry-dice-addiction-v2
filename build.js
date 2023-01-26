"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const sharp_1 = __importDefault(require("sharp"));
async function buildPackage() {
    const textures = [];
    // Lets start by removing our diceaddiction.js from from the src directory
    if (fs_1.default.existsSync('./src/scripts/diceaddiction.js')) {
        fs_1.default.unlinkSync('./src/scripts/diceaddiction.js');
    }
    // Lets open a write stream we will write too for writing our diceaddiction.js file
    fs_1.default.appendFile('./src/scripts/diceaddiction.js', `Hooks.on('diceSoNiceReady', async(dice3d) => {
  await Promise.all([`, 'utf-8', (err) => {
        if (err)
            throw err;
    });
    // Then we will copy our dice textures into our src/textures directory, after converting them to webp
    const diceTextures = fs_1.default.readdirSync('./assets/textures');
    await Promise.all([
        diceTextures.map(async (diceTexture) => {
            const diceTextureName = diceTexture.split('.')[0];
            if (!fs_1.default.existsSync(`./src/textures/${diceTextureName}.webp`)) {
                const file = fs_1.default.readFileSync(`./assets/textures/${diceTexture}`);
                const convertedFile = await (0, sharp_1.default)(file).webp({ lossless: true }).toBuffer();
                fs_1.default.writeFileSync(`./src/textures/${diceTextureName}.webp`, convertedFile);
            }
            // We will then write our dice texture to our diceaddiction.js file
            textures.push({ name: diceTextureName, hasBump: false });
        })
    ]);
    // We start by copying our bump maps into our src/textures/bump directory, after converting them to webp
    const bumpMaps = fs_1.default.readdirSync('./assets/bump');
    await Promise.all([
        bumpMaps.map(async (bumpMap) => {
            const bumpMapName = bumpMap.split('.')[0];
            if (!fs_1.default.existsSync(`./src/textures/bump/${bumpMapName}.webp`)) {
                const file = fs_1.default.readFileSync(`./assets/bump/${bumpMap}`);
                const convertedFile = await (0, sharp_1.default)(file).webp({ lossless: true }).toBuffer();
                fs_1.default.writeFileSync(`./src/textures/bump/${bumpMapName}.webp`, convertedFile);
            }
            const textureIndex = textures.findIndex((texture) => texture.name === bumpMapName);
            if (textureIndex !== -1)
                textures[textureIndex].hasBump = true;
        })
    ]);
    // We will then write our dice textures to our diceaddiction.js file
    textures.forEach(({ name, hasBump }) => {
        fs_1.default.appendFile('./src/scripts/diceaddiction.js', `    dice3d.addTexture("${name}", {
      name: "📱 ${name}",
      composite: "multiply",
      source: "modules/dice-addiction-v2/textures/${name}.webp",
      bump: "${(hasBump) ? `modules/dice-addiction-v2/textures/bump/${name}.webp` : `modules/dice-addiction-v2/textures/${name}.webp`}"
    }),\n`, 'utf-8', (err) => {
            if (err)
                throw err;
        });
    });
    // Then we will copy our dice faces into our src/faces directory, after converting them to webp
    const diceFaces = fs_1.default.readdirSync('./assets/faces');
    await Promise.all([
        diceFaces.map(async (diceFace) => {
            const diceFaceName = diceFace.split('.')[0];
            if (!fs_1.default.existsSync(`./src/faces/${diceFaceName}.webp`)) {
                const file = fs_1.default.readFileSync(`./assets/faces/${diceFace}`);
                const convertedFile = await (0, sharp_1.default)(file).webp({ lossless: true }).toBuffer();
                fs_1.default.writeFileSync(`./src/faces/${diceFaceName}.webp`, convertedFile);
            }
        })
    ]);
    // Then we will write our color profiles to our diceaddiction.js file
    fs_1.default.appendFile('./src/scripts/diceaddiction.js', `   ]);

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
  }, "default");\n`, 'utf-8', (err) => { if (err)
        throw err; });
    // We will then write our dice faces to our diceaddiction.js file
    fs_1.default.appendFile('./src/scripts/diceaddiction.js', `
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
});`, 'utf-8', (err) => { if (err)
        throw err; });
    // We will start by getting the package.json
    const packageDeclaration = JSON.parse(fs_1.default.readFileSync('./package.json', 'utf-8'));
    // We will start by copying the module.json file from the root directory to the src directory
    const moduleDeclaration = JSON.parse(fs_1.default.readFileSync('./module.json', 'utf-8'));
    // If we haven't updated the version in the module.json file, we will do it now
    if (moduleDeclaration.version !== packageDeclaration.version) {
        moduleDeclaration.version = packageDeclaration.version;
        console.log(`Updated version to ${packageDeclaration.version}`);
        fs_1.default.writeFileSync('./module.json', JSON.stringify(moduleDeclaration, null, 2));
    }
    // We will copy our root module.json into the src directory
    fs_1.default.writeFileSync('./src/module.json', JSON.stringify(moduleDeclaration, null, 2));
    // We will then delete the dice-addiction.zip so we can create a new one
    if (fs_1.default.existsSync('./dice-addiction.zip')) {
        fs_1.default.unlinkSync('./dice-addiction.zip');
    }
    // Then we will zip the src directory and rename it to dice-addiction.zip
    const output = fs_1.default.createWriteStream('./dice-addiction.zip');
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    output.on('close', () => {
        console.log(`Created dice-addiction.zip (${archive.pointer()} total bytes)`);
    });
    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            console.warn(err);
        }
        else {
            // throw error
            throw err;
        }
    });
    archive.on('error', (err) => {
        throw err;
    });
    archive.pipe(output);
    archive.directory('./src/', false);
    archive.finalize();
}
(async () => {
    await buildPackage();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQix3REFBZ0M7QUFDaEMsa0RBQTBCO0FBRTFCLEtBQUssVUFBVSxZQUFZO0lBQ3pCLE1BQU0sUUFBUSxHQUE4QyxFQUFFLENBQUM7SUFFL0QsMEVBQTBFO0lBQzFFLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFDO1FBQ2xELFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNqRDtJQUVELG1GQUFtRjtJQUNuRixZQUFFLENBQUMsVUFBVSxDQUNYLGdDQUFnQyxFQUNoQztzQkFDa0IsRUFDbEIsT0FBTyxFQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDTixJQUFJLEdBQUc7WUFBRSxNQUFNLEdBQUcsQ0FBQztJQUNyQixDQUFDLENBQ0YsQ0FBQztJQUVGLHFHQUFxRztJQUNyRyxNQUFNLFlBQVksR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFekQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2hCLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLGVBQWUsT0FBTyxDQUFDLEVBQUM7Z0JBQzNELE1BQU0sSUFBSSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMscUJBQXFCLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBRWpFLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFD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