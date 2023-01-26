"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const sharp_1 = __importDefault(require("sharp"));
async function buildPackage() {
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
        })
    ]);
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
        })
    ]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQix3REFBZ0M7QUFDaEMsa0RBQTBCO0FBRTFCLEtBQUssVUFBVSxZQUFZO0lBQ3pCLHdHQUF3RztJQUN4RyxNQUFNLFFBQVEsR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRWpELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoQixRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUUsRUFBRTtZQUM1QixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QixXQUFXLE9BQU8sQ0FBQyxFQUFDO2dCQUM1RCxNQUFNLElBQUksR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUV6RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUEsZUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUU1RSxZQUFFLENBQUMsYUFBYSxDQUFDLHVCQUF1QixXQUFXLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQzthQUM1RTtRQUNILENBQUMsQ0FBQztLQUNILENBQUMsQ0FBQztJQUVILCtGQUErRjtJQUMvRixNQUFNLFNBQVMsR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbkQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzlCLE1BQU0sWUFBWSxHQUFH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