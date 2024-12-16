import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../components/LandingPage'), {
  ssr: false
})
 
export default function Home() {
  return <DynamicHeader />
}
