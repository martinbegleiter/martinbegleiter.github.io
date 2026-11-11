import type { Post } from '$lib/types';
import type { Locale } from '$lib/i18n/locales';

export async function getPosts(locale: Locale): Promise<Post[]> {
	const posts: Post[] = [];

	// Posts live in /src/lib/content/posts/<locale>/<slug>.md
	const paths = import.meta.glob('/src/lib/content/posts/*/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const postLocale = path.split('/').at(-2);

		if (postLocale !== locale) continue;

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } as Post;
			posts.push(post);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
