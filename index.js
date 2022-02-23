const 
    fs = require('fs'),
    PNG = require('pngjs').PNG,
    imageconverter = require('./imageconverter');

const dir = './imgs';
// list all files in the directory

const difficulty = {
    "Easy": 1,
    "Mid": 2,
    "Hard": 3
};

let images_array = [];

function process_image(path, diff, number) {
    const data = fs.readFileSync(path);
    const png = PNG.sync.read(data);
    const img_str = imageconverter.RGBAtoString(png.data, {width:png.width, height:png.height, transparent:1, compression:1, output:'raw'});
    images_array.push({
        m: (number > 1),
        i: img_str,
        d: difficulty[diff],
    });
}

function process_folder(folder, number) {
    const folder_path = dir+"/"+folder+"/"+number;
    const files = fs.readdirSync(folder_path);
    files.forEach(file => {
        process_image(folder_path+"/"+file, folder, number);
    });
}

const folders = fs.readdirSync(dir);
folders.forEach(folder => {
    console.log(`Processing ${folder}`);
    ["1","2"].forEach(e => process_folder(folder, e));
});
const images_data = JSON.stringify(images_array);
console.log(images_data);
fs.writeFileSync("images.json", images_data);
