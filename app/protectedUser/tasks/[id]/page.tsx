
import BoostButton from "@/components/BoostChannel";
import CheckReferralsButton from "@/components/CheckReferrals";
import Deluck from "@/components/deluck";
import EmojiCheckButton from "@/components/EmojiCheck";
import FollowButton from "@/components/followTwitter";
import FollowYoutube from "@/components/FollowYoutube";
import JoinCommunity from "@/components/JoinCommunity";
import Latest from "@/components/latestRt";
import Optimus from "@/components/Optimus";
import ReactCommunity from "@/components/React";
import RetweetButton from "@/components/RetweetButton";
import StormCommunity from "@/components/StormCon";
import Task from "@/components/Tassk";
import ThirdRetweetButton from "@/components/ThirdRetweet";
import TimerButton from "@/components/TimedButton";
import TopTasks from "@/components/TopTasks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";



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
    const taskUrl = "https://x.com/slothupfam/status/1875173594340463043?s=46&t=7XhUpaocxGD005ZNFokjmQ"
    const youUrl = "https://youtube.com/@slothupfam?si=CFfa2GF9zCZOpZlZ"
    const neRetweet = "https://x.com/slothupfam/status/1878390637944287355?s=46&t=7XhUpaocxGD005ZNFokjmQ";
    const stormUrl = "https://t.me/StormTradeBot/academy?startapp=2m6KH9YPGDg1xGw1F3trW8hRHhncxtsCWvkB3p4Vo6h"
    const stormTask = "https://t.me/+ZZfRPrExxT9jMTUy"
    const optimus = "https://t.me/optimus_x_bot/app?startapp=94538a1c77"
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
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
              <Image src="https://utfs.io/f/MyBJHXY8aJsOGcTMhxblurUy8Mb0VCNOD6g9Bpa7KvAeXQiz" alt="youtube icon" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Join Storm Trade news channel</p>
                </div>
                <StormCommunity telegramId={userDetails.json.telegramId} stormUrl={stormTask}  />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">React to post on channel</p>
                </div>
                <ReactCommunity telegramId={userDetails.json.telegramId} reactUrl={reactUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Like and Retweet our X post</p>
                </div>
                <ThirdRetweetButton telegramId={userDetails.json.telegramId} thirdRetweetUrl={thirdRetweetUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Like and Retweet our X post</p>
                </div>
                <Task telegramId={userDetails.json.telegramId} taskUrl={taskUrl} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Like and Retweet our latest post</p>
                </div>
                <Latest telegramId={userDetails.json.telegramId} neRtweetUrl={neRetweet} />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Follow Sloth Youtube Channel <Image src="/youtube.svg" alt="youtube icon" width={20} height={20} /></p>
                </div>
                <FollowYoutube telegramId={userDetails.json.telegramId} youUrl={youUrl} />
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        <TabsContent value="partners">
        <Card className="border-[1px] border-text-color">
        <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOGcTMhxblurUy8Mb0VCNOD6g9Bpa7KvAeXQiz" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Run Storm Trade Bot</p>
                </div>
                <Deluck telegramId={userDetails.json.telegramId} deluckUrl={stormUrl} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOu86gALVC6xK3W2UBQrvSP5M8IamutpnX0ZLf" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Complete a task on OptimusX Bot</p>
                </div>
                <Optimus telegramId={userDetails.json.telegramId} optimus={optimus} />
              </div>
          </CardContent>
        </Card>
        </TabsContent>
        </Tabs>
       
      </div>
    )
  }
  
