import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../../components/Airdrop'), {
  ssr: false
})
 
export default function Home() {
  return <DynamicHeader />
}
