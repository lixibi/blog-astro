import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(60),
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			// 文章分类字段 - 保留用于向后兼容，推荐使用tags
			category: z.enum(["技术类", "生活类", "学习类", "游戏类"]).optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z
			.string()
			// .datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			// .transform((val) => new Date(val)),
      .refine((val) => {
        // 修改：解析自定义格式的日期字符串，兼容 "YYYY-MM-DD HH:mm" 和 "YYYY-MM-DDTHH:mm"
        const datePattern = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}$/;
        return datePattern.test(val);
      }, "Invalid date format. Expected YYYY-MM-DD HH:mm or YYYY-MM-DDTHH:mm")
      .transform((val) => {
        // 统一处理分隔符，将 "T" 替换为空格
        const normalizedVal = val.replace("T", " ");
        const [datePart, timePart] = normalizedVal.split(" ");
        if (!datePart || !timePart) {
          throw new Error("Invalid date format. Expected YYYY-MM-DD HH:mm or YYYY-MM-DDTHH:mm");
        }
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");
        if (!year || !month || !day || !hour || !minute) {
          throw new Error("Invalid date format. Expected YYYY-MM-DD HH:mm or YYYY-MM-DDTHH:mm");
        }
        return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
      }),
	}),
});

// 书影推荐集合
const recommendation = defineCollection({
	loader: glob({ base: "./src/content/recommendation", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			type: z.enum(["book", "movie", "tv", "documentary"]), // 类型：书籍、电影、电视剧、纪录片
			author: z.string().optional(), // 作者/导演
			year: z.number().optional(), // 出版年份/上映年份
			rating: z.number().min(1).max(10).optional(), // 个人评分 1-10
			cover: z.string().optional(), // 封面图片
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			status: z.enum(["reading", "finished", "wishlist"]).default("finished"), // 状态：在读/在看、已完成、想读/想看
		}),
});

export const collections = { post, note, recommendation };
