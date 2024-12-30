
import BoostButton from "@/components/BoostChannel";
import CheckReferralsButton from "@/components/CheckReferrals";
import EmojiCheckButton from "@/components/EmojiCheck";
import FollowButton from "@/components/followTwitter";
import JoinCommunity from "@/components/JoinCommunity";
import ReactCommunity from "@/components/React";
import RetweetButton from "@/components/RetweetButton";
import ThirdRetweetButton from "@/components/ThirdRetweet";
import TimerButton from "@/components/TimedButton";
import TopTasks from "@/components/TopTasks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const getData = async (id:bigint)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`)
  
  if (!res.ok){
    throw new Error("Failed");
  }
  
  return res.json()
  }
  
  export default async function  TasksPage({params}:{params:{id:bigint}}) {
    const userDetails : any = await getData(params.id)
    const xUrl= "https://x.com/slothupfam?s=11"
    const boostUrl = "https://t.me/boost/RealslothHouse"
    const retweetUrl = "https://x.com/slothupfam/status/1868306187785289786?s=46&t=7XhUpaocxGD005ZNFokjmQ"
    const telegramUrl = "https://t.me/RealslothHouse"
    const reactUrl = "https://t.me/RealslothHouse/18"
    const thirdRetweetUrl = "https://x.com/slothupfam/status/1873020767652188580?s=46&t=7XhUpaocxGD005ZNFokjmQ"
    return (

      <div className="bg-primary-bg p-4 w-full gap-8 flex flex-col justify-center items-center overflow-y-scroll h-fit mb-20">
        <div className="flex flex-col items-center justify-center gap-2 ">
        <TopTasks />
        <h1 className="font-Nohemi text-text-color text-2xl">Complete Tasks to earn <span className="font-Nohemi text-button-color ">REWARDS!</span></h1>
        </div>
        <Tabs defaultValue="earn" className="w-[97%] text-text-color">
         <TabsList className="grid w-full grid-cols-2 bg-under-color">
           <TabsTrigger className=" focus:bg-primary-bg" value="earn">Earn Sloths</TabsTrigger>
           <TabsTrigger value="partners">Partners</TabsTrigger>
         </TabsList>
        <TabsContent className="text-text-color" value="earn"> 
          <Card className="border-[1px] border-text-color">
            <CardHeader className="font-Nohemi text-xl text-text-color">Earn some sloths here!</CardHeader>
            <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Earn 100 Sloths every minute</p>
                <p className="font-Nohemi text-[10px] text-[#db1e1ee5]">Wait till the timer on the ad page finishes to get your rewards.</p>
                </div>
                <TimerButton telegramId={userDetails.json.telegramId} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Put🦥 in your username</p>
                </div>
                <EmojiCheckButton telegramId={userDetails.json.telegramId} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Follow us on X🦥</p>
                </div>
                <FollowButton telegramId={userDetails.json.telegramId} xUrl={xUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm ">Reweet pinned Sloth post🦥</p>
                </div>
                <RetweetButton telegramId={userDetails.json.telegramId} retweetUrl={retweetUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm ">Join our telegram Community🦥</p>
                </div>
                <JoinCommunity telegramId={userDetails.json.telegramId} telegramUrl={telegramUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm ">Invite 10 users for Sloth🦥</p>
                </div>
                <CheckReferralsButton telegramId={userDetails.json.telegramId} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Boost our channel</p>
                <p className="font-Nohemi text-[10px] text-[#db1e1ee5]">Must be a telegram premium user</p>
                </div>
                <BoostButton telegramId={userDetails.json.telegramId} boostUrl={boostUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">React to post on channel</p>
                </div>
                <ReactCommunity telegramId={userDetails.json.telegramId} reactUrl={reactUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Like and Retweet our latest post</p>
                </div>
                <ThirdRetweetButton telegramId={userDetails.json.telegramId} thirdRetweetUrl={thirdRetweetUrl} />
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        <TabsContent value="partners">Nothing to see here yet!</TabsContent>
        </Tabs>
       
      </div>
    )
  }
  
