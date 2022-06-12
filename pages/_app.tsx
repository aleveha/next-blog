import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>
			<Component {...pageProps} />
			{/*<Toaster toastOptions={{ duration: 4000, position: "top-center" }} />*/}
		</>
	);
}

export default MyApp;
