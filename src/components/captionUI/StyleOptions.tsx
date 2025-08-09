import React from "react";
import { Palette } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type GradientPreset = {
  top: string;
  bottom: string;
  name: string;
};

const randomHexColor = (): string => {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

const colorDistance = (c1: string, c2: string): number => {
  const [r1, g1, b1] = c1.match(/\w\w/g)!.map((v) => parseInt(v, 16));
  const [r2, g2, b2] = c2.match(/\w\w/g)!.map((v) => parseInt(v, 16));
  return Math.sqrt(
    (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
  );
};

const randomName = (): string => {
  const adjectives = [
    "Pastel",
    "Mint",
    "Peach",
    "Purple",
    "Sunset",
    "Warm",
    "Nature",
    "Pink",
    "Ocean",
    "Golden",
  ];
  const nouns = [
    "Dream",
    "Rose",
    "Blossom",
    "Sky",
    "Cloud",
    "Coral",
    "Fresh",
    "Passion",
    "Mist",
    "Glow",
  ];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

export const generateGradients = (count: number): GradientPreset[] => {
  const presets: GradientPreset[] = [];
  while (presets.length < count) {
    const top = randomHexColor();
    let bottom = randomHexColor();
    while (colorDistance(top, bottom) < 100) {
      bottom = randomHexColor();
    }
    presets.push({ top, bottom, name: randomName() });
  }
  return presets;
};



export const StyleOptions = React.memo(({ 
  selectedColor,
  selectedColorTop,
  selectedColorBottom,
  onColorChange,
  onGradientChange,
  gradientPresets
}: {
  selectedColor: string;
  selectedColorTop: string;
  selectedColorBottom: string;
  onColorChange: (color: string) => void;
  onGradientChange: (top: string, bottom: string) => void;
  gradientPresets: Array<{ top: string; bottom: string; name: string; }>;
}) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 dark:border-gray-600">
    <div className="flex items-center gap-2 mb-4">
      <Palette className="text-pink-600 dark:text-pink-400" size={20} />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Tùy chỉnh giao diện
      </h3>
      <Button className="bg-gradient-to-br from-pink-200 to-blue-300 text-black font-comic" onClick={() => {
          const new_gradien = generateGradients(1)[0]
          onGradientChange(new_gradien.top, new_gradien.bottom)       
        toast.success(`Đã tạo một màu mới - ${new_gradien.name}!`)
      }}>
        Random một màu mới
      </Button>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Màu chữ
        </label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Màu trên
          </label>
          <input
            type="color"
            value={selectedColorTop}
            onChange={(e) => onGradientChange(e.target.value, selectedColorBottom)}
            className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Màu dưới
          </label>
          <input
            type="color"
            value={selectedColorBottom}
            onChange={(e) => onGradientChange(selectedColorTop, e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Gradient có sẵn
        </label>
        <div className="grid grid-cols-4 gap-2">
          {gradientPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => onGradientChange(preset.top, preset.bottom)}
              className="aspect-square rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-pink-500 transition-colors"
              style={{
                background: `linear-gradient(to bottom, ${preset.top}, ${preset.bottom})`
              }}
              title={preset.name}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
));