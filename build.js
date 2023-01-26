"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const sharp_1 = __importDefault(require("sharp"));
function camelCaseToNormalCase(text) {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
}
async function buildPackage() {
    const textures = [];
    // Lets start by removing our diceaddiction.js from from the src directory
    if (fs_1.default.existsSync('./src/scripts/diceaddiction.js')) {
        fs_1.default.unlinkSync('./src/scripts/diceaddiction.js');
    }
    // Lets open a write stream we will write too for writing our diceaddiction.js file
    fs_1.default.appendFile('./src/scripts/diceaddiction.js', `Hooks.on('diceSoNiceReady', async(dice3d) => {
  await Promise.all([\n`, 'utf-8', (err) => {
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
                const image = (0, sharp_1.default)(file);
                const { width, height } = await image.metadata();
                let convertedFile;
                if ((width && width >= 512) || (height && height >= 512)) {
                    convertedFile = await image.resize(512, 512).webp({ lossless: true }).toBuffer();
                }
                else {
                    convertedFile = await image.webp({ lossless: true }).toBuffer();
                }
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
      name: "📱 ${camelCaseToNormalCase(name)}",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQix3REFBZ0M7QUFDaEMsa0RBQTBCO0FBRzFCLFNBQVMscUJBQXFCLENBQUMsSUFBWTtJQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHLElBQUcsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsRyxDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVk7SUFDekIsTUFBTSxRQUFRLEdBQThDLEVBQUUsQ0FBQztJQUUvRCwwRUFBMEU7SUFDMUUsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLEVBQUM7UUFDbEQsWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsbUZBQW1GO0lBQ25GLFlBQUUsQ0FBQyxVQUFVLENBQ1gsZ0NBQWdDLEVBQ2hDO3dCQUNvQixFQUNwQixPQUFPLEVBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNOLElBQUksR0FBRztZQUFFLE1BQU0sR0FBRyxDQUFDO0lBQ3JCLENBQUMsQ0FDRixDQUFDO0lBRUYscUdBQXFHO0lBQ3JHLE1BQU0sWUFBWSxHQUFHLFlBQUUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUV6RCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDaEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsZUFBZSxP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