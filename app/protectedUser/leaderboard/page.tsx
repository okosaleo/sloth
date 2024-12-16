import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('../../../components/LeaderboardPage'), {
  ssr: false
})
 
export default function Home() {
  return <DynamicHeader />
}
