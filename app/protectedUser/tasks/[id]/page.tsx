
import Bee from "@/components/Bee";
import BoostButton from "@/components/BoostChannel";
import Community from "@/components/captch";
import CheckReferralsButton from "@/components/CheckReferrals";
import Deluck from "@/components/deluck";
import Dice from "@/components/Dice";
import EmojiCheckButton from "@/components/EmojiCheck";
import FollowYoutube from "@/components/FollowYoutube";
import Justin from "@/components/justin";
import Judt from "@/components/justinCon";
import Main from "@/components/Main";
import Optimus from "@/components/Optimus";
import ShaCommunity from "@/components/Sha";
import Shark from "@/components/Shark";
import Shiba from "@/components/SHiba";
import ShibaCon from "@/components/shibacon";
import StormCommunity from "@/components/StormCon";
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
    const boostUrl = "https://t.me/boost/RealslothHouse"
    const youUrl = "https://youtube.com/@slothupfam?si=CFfa2GF9zCZOpZlZ"
    const stormUrl = "https://t.me/StormTradeBot/academy?startapp=2m6KH9YPGDg1xGw1F3trW8hRHhncxtsCWvkB3p4Vo6h"
    const stormTask = "https://t.me/+ZZfRPrExxT9jMTUy"
    const optimus = "https://t.me/optimus_x_bot/app?startapp=94538a1c77"
    const beeUrl = "https://t.me/Bee_coinbot"
    const sharkUrl = "https://t.me/captcha_airdrop_bot"
    const captha = 'https://t.me/CAPtchaANN'
    const shaCon = "https://x.com/thesharks_emoji?s=21"
    const justiUrl = "https://t.me/swipe_quest_bot/swipe"
    const justinCon = "https://t.me/swipequest"
    const mete = "https://t.me/megaminetg_bot/megamine?startapp=5808920156"
    const shiba = "https://t.me/Shiba_Fishing_Bot/Shiba_Fishing?startapp=5SIS78O"
    const shibaCon = "https://t.me/ShibFishingCommunity"
    const dice = "https://t.me/DiceSwap_Bot?start=Dm9oOdCpfN"
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
              <Image src="https://utfs.io/f/MyBJHXY8aJsOGcTMhxblurUy8Mb0VCNOD6g9Bpa7KvAeXQiz" alt="youtube icon" width={30} height={30} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Join Storm Trade news channel</p>
                </div>
                <StormCommunity telegramId={userDetails.json.telegramId} stormUrl={stormTask}  />
              </div>
              <div className="flex flex-row items-center p-3 justify-between border-b-[1.5px] border-text-color">
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Follow Sloth Youtube Channel <Image src="/youtube.svg" alt="youtube icon" width={20} height={20} /></p>
                </div>
                <FollowYoutube telegramId={userDetails.json.telegramId} youUrl={youUrl} />
              </div>
              <div className="flex flex-row items-center  gap-1 p-3 justify-between border-b-[1.5px] border-text-color">
              <Image src="https://utfs.io/f/MyBJHXY8aJsOjld1OaqIeYApcJNRqk90SdhbC7jZGzLQ4vBw" className="rounded-md" alt="youtube icon" width={30} height={30} />
                <div className="flex flex-row w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Follow SHARKS For $SHARKS Airdrop </p>
                </div>
                <ShaCommunity telegramId={userDetails.json.telegramId} telegramUrl={shaCon} />
              </div>
              <div className="flex flex-row items-center gap-1 p-3 justify-between border-b-[1.5px] border-text-color">
              <Image src="https://utfs.io/f/MyBJHXY8aJsOzY49mJRfgZCd6PjRV3BoS0xJLewTmUQh4pGE" className="rounded-md" alt="youtube icon" width={30} height={30} />
                <div className="flex flex-row gap-1 w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Join CAPtcha TG Channel </p>
                </div>
                <Community telegramId={userDetails.json.telegramId} telegramUrl={captha} />
              </div>
              <div className="flex flex-row items-center gap-1 p-3 justify-between border-b-[1.5px] border-text-color">
              <Image src="https://utfs.io/f/MyBJHXY8aJsOGjHLYmblurUy8Mb0VCNOD6g9Bpa7KvAeXQiz" className="rounded-md" alt="youtube icon" width={30} height={30} />
                <div className="flex flex-row gap-1 w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Join Swipe Quest Pixel community </p>
                </div>
                <Judt telegramId={userDetails.json.telegramId} telegramUrl={justinCon} />
              </div>
              <div className="flex flex-row items-center gap-1 p-3 justify-between border-b-[1.5px] border-text-color">
              <Image src="https://utfs.io/f/MyBJHXY8aJsOybqt1IoDZchJ3KlPn1e5Xf0qYmz9sN2MrxBS" className="rounded-md" alt="youtube icon" width={30} height={30} />
                <div className="flex flex-row gap-1 w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Join Shiba Fishing community </p>
                </div>
                <ShibaCon telegramId={userDetails.json.telegramId} telegramUrl={shibaCon} />
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
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOdTN8FfQ9W02NcG3YMTnxIeOJzbPESFj5lkrU" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Earn with BeeCoin Bot</p>
                </div>
                <Bee telegramId={userDetails.json.telegramId} beeUrl={beeUrl} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOzY49mJRfgZCd6PjRV3BoS0xJLewTmUQh4pGE" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Play CAPtcha
                </p>
                </div>
                <Shark telegramId={userDetails.json.telegramId} sharkUrl={sharkUrl} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOGjHLYmblurUy8Mb0VCNOD6g9Bpa7KvAeXQiz" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Launch Swipe Quest Pixel
                </p>
                </div>
                <Justin telegramId={userDetails.json.telegramId} justinUrl={justiUrl} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOmciQhByvhJT621gucKPVvIoHjaEASW7qb3Yl" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Launch Megamine
                </p>
                </div>
                <Main telegramId={userDetails.json.telegramId} mainUrl={mete} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsOybqt1IoDZchJ3KlPn1e5Xf0qYmz9sN2MrxBS" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Launch Shiba Fishing
                </p>
                </div>
                <Shiba telegramId={userDetails.json.telegramId} shibaUrl={shiba} />
              </div>
              <div className="flex flex-row gap-1 items-center p-3 justify-between border-b-[1.5px] border-text-color">
          <Image src="https://utfs.io/f/MyBJHXY8aJsO9uX53uOqWIAzfPBv8VxbTe4drSm60LGpMl2i" alt="storm Image" width={40} height={40} className="rounded-md" />
                <div className="flex flex-col w-2/3">
                <p className="font-Nohemi text-text-color text-sm">Complete a task on DiceSwap
                </p>
                </div>
                <Dice telegramId={userDetails.json.telegramId} diceUrl={dice} />
              </div>
          </CardContent>
        </Card>
        </TabsContent>
        </Tabs>
       
      </div>
    )
  }
  
