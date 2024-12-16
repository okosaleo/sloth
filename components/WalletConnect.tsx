"use client";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import { useCallback, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown, DoorOpen, Wallet } from 'lucide-react';

export default function WalletConnect() {
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        setIsLoading(false);
      }, []);
    
      const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet disconnected successfully!");
        setIsLoading(false);
      }, []);
    
      useEffect(() => {
        const checkWalletConnection = async () => {
          if (tonConnectUI.account?.address) {
            handleWalletConnection(tonConnectUI.account?.address);
          } else {
            handleWalletDisconnection();
          }
        };
    
        checkWalletConnection();
    
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
          if (wallet) {
            handleWalletConnection(wallet.account.address);
          } else {
            handleWalletDisconnection();
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);
    
      
      const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
          setIsLoading(true);
          await tonConnectUI.disconnect();
        } else {
          await tonConnectUI.openModal();
        }
      };
    
      const formatAddress = (address: string) => {
        const tempAddress = Address.parse(address).toString();
        return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
      };
    
  return (
    <div>
        {tonWalletAddress ? (
          <DropdownMenu>
          <DropdownMenuTrigger className="bg-button-color flex items-center rounded font-Nohemi text-text-color p-3 gap-2">
            <Wallet className="size-4 text-text-color" /> {formatAddress(tonWalletAddress)}<ChevronDown className="text-text-color size-5" />
            </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuItem onClick={handleWalletAction} className="flex items-center p-3 rounded-md bg-[#808080d0] font-Nohemi  text-text-color gap-3">
            <DoorOpen className="text-[#ff0000c2] size-5" /> Disconnect Wallet
          </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-button-color text-text-color flex items-center gap-3 font-bold py-2 px-4  rounded-md"
        >
         <Wallet className="size-4" /> Connect Wallet
        </button>
      )}
    </div>
  )
}
