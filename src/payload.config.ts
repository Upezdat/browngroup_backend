import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import seo from '@payloadcms/plugin-seo';
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

import Publications from './collections/Publications'
import News from './collections/News'
import Users from './collections/Users'
import { Media } from './collections/Media'
import Events from './collections/Events'
import DiagnosticLabs from './collections/DiagnosticLabs'
import LegalFirms from './collections/LegalFirms'
import Medicines from './collections/Medicines'
import Team from './collections/Team'
import Diseases from './collections/Diseases'
import NewsCategories from './collections/News/categories'
// import Home from './collections/Pages/Home'
import HomeGlobal from './pages/home'
import AboutPage from './pages/about'
import CustomerQueries from './collections/CustomerQueries'
import ContactQueries from './collections/ContactQueries'
import TherapyFocusPage from './pages/therapyFocus'
import AlliancesPage from './pages/Alliances'
// import Home from './pages/home'
import NavMenu from './global/navbar'
const generateTitle: GenerateTitle = () => {
  return 'Brawn Rare Disease'
}

export default buildConfig({
  // serverURL: 'https://3.111.149.144.nip.io',
  rateLimit: {
    window: 30000,
    max: 100000,
    trustProxy: true
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Media, Publications, News, Events, DiagnosticLabs, LegalFirms, Medicines, Team, Diseases, NewsCategories, CustomerQueries, ContactQueries],
  globals: [HomeGlobal, AboutPage, TherapyFocusPage, AlliancesPage, NavMenu],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud(),
    seo({
      collections: ['publications', 'news'],
      // generateTitle: ({ doc }) => `Brawn — ${doc.title.value}`,
      uploadsCollection: 'media',
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
