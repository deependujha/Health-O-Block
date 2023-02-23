import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import 'simplebar-react/dist/simplebar.min.css';


export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				<Head>
					<title>Ayushman health portal</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}
