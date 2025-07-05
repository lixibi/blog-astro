import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
		"!./src/pages/og-image/[slug].png.ts",
	],
	corePlugins: {
		// disable some core plugins as they are included in the css, even when unused
		borderOpacity: false,
		fontVariantNumeric: false,
		ringOffsetColor: false,
		ringOffsetWidth: false,
		scrollSnapType: false,
		textOpacity: false,
		touchAction: false,
	},
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			// 扩展响应式断点以支持宽屏优化
			screens: {
				'xl': '1200px',  // 宽屏断点
				'2xl': '1400px', // 超宽屏断点
			},
			// 扩展最大宽度选项
			maxWidth: {
				'5xl': '64rem',   // 1024px - 标准宽屏
				'6xl': '72rem',   // 1152px - 宽屏优化
				'7xl': '80rem',   // 1280px - 超宽屏
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		plugin(({ addComponents }) => {
			addComponents({
				".hanbayu-link": {
					"&:hover": {
						"@apply decoration-link decoration-2": {},
					},
					"@apply underline underline-offset-2": {},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
				// 统一悬停效果组件类
				".hanbayu-card": {
					"@apply rounded-xl border border-border-subtle bg-bg-elevated shadow-sm": {},
					"@apply transition-all duration-300 ease-out": {},
					"&:hover": {
						"@apply shadow-md bg-bg-subtle border-border": {},
					},
				},
				".hanbayu-card-small": {
					"@apply rounded-lg border border-border-subtle bg-bg-muted shadow-sm": {},
					"@apply transition-all duration-200 ease-out": {},
					"&:hover": {
						"@apply shadow-sm bg-bg-elevated border-border": {},
					},
				},
				".hanbayu-link-hover": {
					"@apply text-link transition-colors duration-200 ease-out": {},
					"&:hover": {
						"@apply text-accent": {},
					},
				},
				".hanbayu-button": {
					"@apply rounded-lg bg-bg-muted border border-border-subtle px-4 py-2": {},
					"@apply font-medium text-link transition-all duration-200 ease-out": {},
					"&:hover": {
						"@apply bg-bg-subtle border-border text-accent shadow-sm": {},
					},
				},
				// 项目卡片专用 - 默认暗色，无悬停效果
				".hanbayu-project-card": {
					"@apply rounded-xl border border-border-subtle bg-bg-subtle shadow-sm": {},
				},
			});
		}),
	],
	theme: {
		extend: {
      	colors: {
				// 强调色系统
				accent: "hsl(var(--theme-accent) / <alpha-value>)",
				"accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
				"accent-soft": "hsl(var(--theme-accent-soft) / <alpha-value>)",

				// 背景色层次
				bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
				"bg-elevated": "hsl(var(--theme-bg-elevated) / <alpha-value>)",
				"bg-subtle": "hsl(var(--theme-bg-subtle) / <alpha-value>)",
				"bg-muted": "hsl(var(--theme-bg-muted) / <alpha-value>)",

				// 文本色层次
				textColor: "hsl(var(--theme-text) / <alpha-value>)",
				"text-muted": "hsl(var(--theme-text-muted) / <alpha-value>)",
				link: "hsl(var(--theme-link) / <alpha-value>)",

				// 边框色层次
				border: "hsl(var(--theme-border) / <alpha-value>)",
				"border-subtle": "hsl(var(--theme-border-subtle) / <alpha-value>)",

				// 功能色彩
				quote: "hsl(var(--theme-quote) / <alpha-value>)",
				shadow: "hsl(var(--theme-shadow) / <alpha-value>)",
			},
			fontFamily: {
				// Add any custom fonts here
				sans: [...fontFamily.sans],
				serif: [...fontFamily.serif],
			},
			transitionProperty: {
				height: "height",
			},
			// @ts-expect-error
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							"@apply hanbayu-link": "",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						kbd: {
							"@apply dark:bg-textColor": "",
						},
						hr: {
							borderTopStyle: "dashed",
						},
						strong: {
							fontWeight: "700",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"@apply bg-none": "",
							},
						},
						/* Table */
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							borderBottom: "1px dashed #666",
							fontWeight: "700",
						},
						'th[align="center"], td[align="center"]': {
							"text-align": "center",
						},
						'th[align="right"], td[align="right"]': {
							"text-align": "right",
						},
						'th[align="left"], td[align="left"]': {
							"text-align": "left",
						},
						/* Admonitions/Aside */
						".aside": {
							"--admonition-color": "var(--tw-prose-quotes)",
							"@apply my-4 py-4 ps-4 border-s-2 border-[--admonition-color]": "",
							".aside-title": {
								"@apply font-bold text-base flex items-center gap-2 my-0 capitalize text-[--admonition-color]":
									"",
								"&:before": {
									"@apply inline-block shrink-0 overflow-visible h-4 w-4 align-middle content-[''] bg-[--admonition-color]":
										"",
									"mask-size": "contain",
									"mask-position": "center",
									"mask-repeat": "no-repeat",
								},
							},
							".aside-content": {
								"> :last-child": {
									"@apply mb-0": "",
								},
							},
						},
						".aside.aside-note": {
							"--admonition-color": theme("colors.blue.400"),
							"@apply bg-blue-400/5": "",
							".aside-title": {
								"&:before": {
									maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath fill='var(--admonitions-color-tip)' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'%3E%3C/path%3E%3C/svg%3E")`,
								},
							},
						},
						".aside.aside-tip": {
							"--admonition-color": theme("colors.lime.500"),
							"@apply bg-lime-500/5": "",
							".aside-title": {
								"&:before": {
									maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z'%3E%3C/path%3E%3C/svg%3E")`,
								},
							},
						},
						".aside.aside-important": {
							"--admonition-color": theme("colors.purple.400"),
							"@apply bg-purple-400/5": "",
							".aside-title": {
								"&:before": {
									maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'%3E%3C/path%3E%3C/svg%3E")`,
								},
							},
						},
						".aside.aside-warning": {
							"--admonition-color": theme("colors.orange.400"),
							"@apply bg-orange-400/5": "",
							".aside-title": {
								"&:before": {
									maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'%3E%3C/path%3E%3C/svg%3E")`,
								},
							},
						},
						".aside.aside-caution": {
							"--admonition-color": theme("colors.red.500"),
							"@apply bg-red-500/5": "",
							".aside-title": {
								"&:before": {
									maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'%3E%3C/path%3E%3C/svg%3E")`,
								},
							},
						},
					},
				},
				cactus: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.textColor / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-hr": "0.5px dashed #666",
						"--tw-prose-links": theme("colors.link / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-th-borders": "#666",
						// 优化标题间距
						"h1, h2, h3, h4, h5, h6": {
							fontFamily: "'LXGW Bright SemiLight', 'Microsoft YaHei', 'PingFang SC', sans-serif",
							marginTop: "1.5em",
							marginBottom: "0.5em",
						},
						// 优化段落间距和字体大小
						"p": {
							marginTop: "1em",
							marginBottom: "1em",
							lineHeight: "1.7",
							fontSize: "18px",
						},
						// 优化列表样式
						"ul, ol": {
							marginTop: "1em",
							marginBottom: "1em",
							fontSize: "18px",
						},
						"li": {
							marginTop: "0.5em",
							marginBottom: "0.5em",
							fontSize: "18px",
						},
						// 优化代码块样式
						"pre": {
							backgroundColor: "hsl(var(--theme-bg))",
							border: "1px solid hsl(var(--theme-link) / 0.2)",
							borderRadius: "6px",
							fontSize: "0.875rem",
							lineHeight: "1.5",
						},
						"code": {
							backgroundColor: "hsl(var(--theme-link) / 0.1)",
							border: "1px solid hsl(var(--theme-link) / 0.2)",
							borderRadius: "3px",
							fontSize: "0.875rem",
							fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
						},
						"pre code": {
							backgroundColor: "transparent",
							border: "none",
							borderRadius: "0",
						},
						// 优化引用块样式
						"blockquote": {
							fontSize: "18px",
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
} satisfies Config;
