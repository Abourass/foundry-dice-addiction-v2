"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const archiver_1 = __importDefault(require("archiver"));
const sharp_1 = __importDefault(require("sharp"));
function camelCaseToNormalCase(text) {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
}
function camelCaseToPascalCase(text) {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }).replace(/\s/g, '');
}
async function buildPackage() {
    const textures = [];
    // Lets start by removing our diceaddiction.js from from the src directory
    if (fs_1.default.existsSync('./src/scripts/diceaddiction.js'))
        fs_1.default.unlinkSync('./src/scripts/diceaddiction.js');
    // Lets open a write stream we will write too for writing our diceaddiction.js file
    await (0, promises_1.appendFile)('./src/scripts/diceaddiction.js', `Hooks.on('diceSoNiceReady', async(dice3d) => {
  await Promise.all([\n`, 'utf-8');
    // Then we will copy our dice textures into our src/textures directory, after converting them to webp
    const diceTextures = fs_1.default.readdirSync('./assets/textures').sort();
    const newTextures = await Promise.all([
        ...diceTextures.map(async (diceTexture) => {
            const diceTextureName = diceTexture.split('.')[0];
            if (!fs_1.default.existsSync(`./src/textures/${diceTextureName}.webp`)) {
                const file = await (0, promises_1.readFile)(`./assets/textures/${diceTexture}`);
                const image = (0, sharp_1.default)(file);
                const { width, height } = await image.metadata();
                let convertedFile;
                if ((width && width >= 256) || (height && height >= 256)) {
                    convertedFile = await image.resize(256, 256).webp({ nearLossless: true }).toBuffer();
                }
                else {
                    convertedFile = await image.webp({ nearLossless: true }).toBuffer();
                }
                await (0, promises_1.writeFile)(`./src/textures/${diceTextureName}.webp`, convertedFile);
                return 'new';
            }
            // We will then write our dice texture to our diceaddiction.js file
            textures.push({ name: diceTextureName, hasBump: false });
        })
    ]);
    // We start by copying our bump maps into our src/textures/bump directory, after converting them to webp
    const bumpMaps = fs_1.default.readdirSync('./assets/bump').sort();
    const newBumpMaps = await Promise.all([
        ...bumpMaps.map(async (bumpMap) => {
            const bumpMapName = bumpMap.split('.')[0];
            if (!fs_1.default.existsSync(`./src/textures/bump/${bumpMapName}.webp`)) {
                const file = await (0, promises_1.readFile)(`./assets/bump/${bumpMap}`);
                const image = (0, sharp_1.default)(file);
                const { width, height } = await image.metadata();
                let convertedFile;
                if ((width && width >= 256) || (height && height >= 256)) {
                    convertedFile = await image.resize(256, 256).webp({ lossless: true }).toBuffer();
                }
                else {
                    convertedFile = await image.webp({ lossless: true }).toBuffer();
                }
                await (0, promises_1.writeFile)(`./src/textures/bump/${bumpMapName}.webp`, convertedFile);
                return 'new';
            }
            // Check for normal bump map
            const textureIndex = textures.findIndex(({ name }) => name === bumpMapName);
            if (textureIndex !== -1)
                textures[textureIndex].hasBump = true;
            // Check for grayscale bump map
            const grayscaleTextureIndex = textures.findIndex(({ name }) => name === `${bumpMapName}Grayscale`);
            if (grayscaleTextureIndex !== -1)
                textures[grayscaleTextureIndex].hasBump = true;
        })
    ]);
    const sortedTextures = textures.sort(((a, b) => (a.name > b.name) ? 1 : -1));
    // We will then write our dice textures to our diceaddiction.js file
    await Promise.all([
        ...sortedTextures.map(async ({ name, hasBump }) => {
            await (0, promises_1.appendFile)('./src/scripts/diceaddiction.js', `    dice3d.addTexture("${camelCaseToPascalCase(name)}", {
      name: "📱 ${camelCaseToNormalCase(name)}",
      composite: "multiply",
      source: "modules/dice-addiction-v2/textures/${name}.webp",
      bump: "${(hasBump)
                ? `modules/dice-addiction-v2/textures/bump/${name.includes('Grayscale') ? name.split('Grayscale')[0] : name}.webp`
                : `modules/dice-addiction-v2/textures/${name}.webp`}"
    }),\n`, 'utf-8');
        })
    ]);
    // Then we will copy our dice faces into our src/faces directory, after converting them to webp
    const diceFaces = fs_1.default.readdirSync('./assets/faces');
    const newDiceFaces = await Promise.all([
        ...diceFaces.map(async (diceFace) => {
            const diceFaceName = diceFace.split('.')[0];
            if (!fs_1.default.existsSync(`./src/faces/${diceFaceName}.webp`)) {
                const file = await (0, promises_1.readFile)(`./assets/faces/${diceFace}`);
                const image = (0, sharp_1.default)(file);
                const convertedFile = await image.webp({ lossless: true }).toBuffer();
                await (0, promises_1.writeFile)(`./src/faces/${diceFaceName}.webp`, convertedFile);
                return 'new';
            }
        })
    ]);
    // Then we will write our color profiles to our diceaddiction.js file
    await (0, promises_1.appendFile)('./src/scripts/diceaddiction.js', `   ]);


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
  }, "default");\n`, 'utf-8');
    // We will then write our dice faces to our diceaddiction.js file
    await (0, promises_1.appendFile)('./src/scripts/diceaddiction.js', `
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
});`, 'utf-8');
    // We will start by getting the package.json
    const packageDeclaration = JSON.parse(fs_1.default.readFileSync('./package.json', 'utf-8'));
    // We will start by copying the module.json file from the root directory to the src directory
    const moduleDeclaration = JSON.parse(fs_1.default.readFileSync('./module.json', 'utf-8'));
    // If we haven't updated the version in the module.json file, we will do it now
    if (moduleDeclaration.version !== packageDeclaration.version) {
        moduleDeclaration.version = packageDeclaration.version;
        console.log(`Updated version to ${packageDeclaration.version}`);
        await (0, promises_1.writeFile)('./module.json', JSON.stringify(moduleDeclaration, null, 2));
    }
    // We will copy our root module.json into the src directory
    await (0, promises_1.writeFile)('./src/module.json', JSON.stringify(moduleDeclaration, null, 2));
    // We will then delete the dice-addiction.zip so we can create a new one
    if (fs_1.default.existsSync('./dice-addiction.zip'))
        fs_1.default.unlinkSync('./dice-addiction.zip');
    // Then we will zip the src directory and rename it to dice-addiction.zip
    const output = fs_1.default.createWriteStream('./dice-addiction.zip');
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    output.on('close', () => {
        console.log(`Created dice-addiction.zip (${(archive.pointer() / 1e+6).toFixed(2)} MB)`);
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
    console.table({
        'New Textures': newTextures.filter(i => i).length,
        'New Bump Maps': newBumpMaps.filter(i => i).length,
        'New Dice Face': newDiceFaces.filter(i => i).length,
    });
}
(async () => {
    await buildPackage();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQiwwQ0FBOEQ7QUFDOUQsd0RBQWdDO0FBQ2hDLGtEQUEwQjtBQUcxQixTQUFTLHFCQUFxQixDQUFDLElBQVk7SUFDekMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVMsR0FBRyxJQUFHLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbEcsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsSUFBWTtJQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHLElBQUcsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RILENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWTtJQUN6QixNQUFNLFFBQVEsR0FBOEMsRUFBRSxDQUFDO0lBRS9ELDBFQUEwRTtJQUMxRSxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUM7UUFBRSxZQUFFLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFHckcsbUZBQW1GO0lBQ25GLE1BQU0sSUFBQSxxQkFBVSxFQUNkLGdDQUFnQyxFQUNoQzt3QkFDb0IsRUFDcEIsT0FBTyxDQUNSLENBQUM7SUFFRixxR0FBcUc7SUFDckcsTUFBTSxZQUFZLEdBQUcsWUFBRSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhFLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLGVBQWUsT0FBTyxDQUFDLEVBQUM7Z0JBQzNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxtQkFBUSxFQUFDLHFCQUFxQixXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxhQUFhLENBQUM7Z0JBRWxCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsRUFBQztvQkFDdkQsYUFBYSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3RGO3FCQUFNO29CQUNMLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckU7Z0JBRUQsTUFBTSxJQUFBLG9CQUFTLEVBQUMsa0JBQWtCLGVBQWUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUN6RSxPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsbUVBQW1FO1lBQ25FLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQztLQUNILENBQUMsQ0FBQztJQUVILHdHQUF3RztJQUN4RyxNQUFNLFFBQVEsR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXhELE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBRSxFQUFFO1lBQy9CLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLFdBQVcsT0FBTyxDQUFDLEVBQUM7Z0JBQzVELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxtQkFBUSxFQUFDLGlCQUFpQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxhQUFhLENBQUM7Z0JBRWxCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsRUFBQztvQkFDdkQsYUFBYSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2xGO3FCQUFNO29CQUNMLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakU7Z0JBRUQsTUFBTSxJQUFBLG9CQUFTLEVBQUMsdUJBQXVCLFdBQVcsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsNEJBQTRCO1lBQzVCLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUM7WUFDNUUsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDO2dCQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRS9ELCtCQUErQjtZQUMvQixNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssR0FBRyxXQUFXLFdBQVcsQ0FBQyxDQUFDO1lBQ25HLElBQUkscUJBQXFCLEtBQUssQ0FBQyxDQUFDO2dCQUFFLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkYsQ0FBQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBR0gsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0Usb0VBQW9FO0lBQ3BFLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoQixHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDakQsTUFBTSxJQUFBLHFCQUFVLEVBQ2QsZ0NBQWdDLEVBQ2hDLDBCQUEwQixxQkFBcUIsQ0FBQyxJQUFJLENBQUM7a0JBQ3pDLHFCQUFxQixDQUFDLElBQUksQ0FBQzs7b0RBRU8sSUFBSTtlQUN6QyxDQUFDLE9BQU8sQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLDJDQUEyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU87Z0JBQ2xILENBQUMsQ0FBQyxzQ0FBc0MsSUFBSSxPQUFPO1VBQ2pELEVBQ0osT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUM7S0FDRCxDQUFDLENBQUE7SUFHRiwrRkFBK0Y7SUFDL0YsTUFBTSxTQUFTLEdBQUcsWUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxZQUFZLE9BQU8sQ0FBQyxFQUFDO2dCQUNyRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsbUJBQVEsRUFBQyxrQkFBa0IsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sYUFBYSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV0RSxNQUFNLElBQUEsb0JBQVMsRUFBQyxlQUFlLFlBQVksT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBRUgscUVBQXFFO0lBQ3JFLE1BQU0sSUFBQSxxQkFBVSxFQUNkLGdDQUFnQyxFQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFnVGUsRUFDZixPQUFPLENBQ1IsQ0FBQztJQUVGLGlFQUFpRTtJQUMvRCxNQUFNLElBQUEscUJBQVUsRUFDZCxnQ0FBZ0MsRUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvREYsRUFDRSxPQUFPLENBQ1IsQ0FBQztJQUVKLDRDQUE0QztJQUM1QyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWxGLDZGQUE2RjtJQUM3RixNQUFNLGlCQUFpQixHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFckcsK0VBQStFO0lBQy9FLElBQUksaUJBQWlCLENBQUMsT0FBTyxLQUFLLGtCQUFrQixDQUFDLE9BQU8sRUFBQztRQUMzRCxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFBLG9CQUFTLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUU7SUFFRCwyREFBMkQ7SUFDM0QsTUFBTSxJQUFBLG9CQUFTLEVBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRix3RUFBd0U7SUFDeEUsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1FBQUUsWUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRWpGLHlFQUF5RTtJQUN6RSxNQUFNLE1BQU0sR0FBRyxZQUFFLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM1RCxNQUFNLE9BQU8sR0FBRyxJQUFBLGtCQUFRLEVBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV4RCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO2FBQU07WUFDTCxjQUFjO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQixNQUFNLEdBQUcsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVyQixPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVuQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbkIsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLGNBQWMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUNqRCxlQUFlLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDbEQsZUFBZSxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0tBQ3BELENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxDQUFDLEtBQUssSUFBRyxFQUFFO0lBQ1QsTUFBTSxZQUFZLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUMsRUFBRSxDQUFBIn0=