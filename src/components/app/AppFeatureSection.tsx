import Image from "next/image";
import type { FeatureSectionData } from "@/types/app";

interface AppFeatureSectionProps {
  feature: FeatureSectionData;
  index: number;
}

export function AppFeatureSection({ feature, index }: AppFeatureSectionProps) {
  // 偶数索引图片在左，奇数索引图片在右
  const isImageLeft = index % 2 === 0;
  // 是否有自定义图片定位（用于 lg 绝对定位布局）
  const hasPosition = !!feature.imagePosition;

  return (
    <section className="py-2 sm:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 功能模块容器 - 移动端左右各半，md+ 保持原有交替布局 */}
        <div
          className={`flex flex-row items-center gap-2 lg:relative ${
            isImageLeft ? "md:flex-row" : "flex-row-reverse md:flex-row-reverse"
          }`}
        >
          {/* 图片区域 */}
          <div
            className={`flex w-1/2 items-center justify-center gap-2 md:w-1/2 ${
              hasPosition ? "lg:absolute lg:z-10 lg:w-auto" : "lg:w-[600px]"
            }`}
            style={hasPosition ? feature.imagePosition : undefined}
          >
            {feature.images.map((img, imgIndex) => (
              <Image
                key={img}
                src={img}
                alt={feature.imagesAlt[imgIndex]}
                width={300}
                height={600}
                className="h-auto max-h-[300px] w-auto rounded-2xl object-contain sm:max-h-[500px]"
                loading="lazy"
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 80vw, 40vw"
              />
            ))}
            {/* 产品实物图（可选） */}
            {feature.productImage && (
              <Image
                src={feature.productImage}
                alt={feature.productImageAlt ?? ""}
                width={200}
                height={400}
                className="h-auto max-h-[300px] w-auto object-contain sm:max-h-[500px]"
                loading="lazy"
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 40vw, 20vw"
              />
            )}
          </div>

          {/* 文字区域 - 移动端固定 w-1/2，lg 端通过 CSS 变量计算宽度 */}
          <div
            className={`w-1/2 border-y py-4 sm:py-[34px] ${
              hasPosition ? "lg:[width:var(--text-w)]" : "lg:w-full"
            } ${isImageLeft ? "text-left" : "text-right"} ${
              hasPosition ? (isImageLeft ? "lg:ml-auto" : "lg:mr-auto") : ""
            }`}
            style={{
              borderColor: "#fce7ee",
              ...(hasPosition
                ? ({
                    "--text-w": `calc(100% - ${feature.imageWidth ?? "400px"})`,
                  } as React.CSSProperties)
                : {}),
            }}
          >
            <h3 className="text-lg font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {feature.title.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-lg">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
