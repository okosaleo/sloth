
import React from 'react';

const Roadmap = () => {
  return (
    <div className="container mx-auto p-8 font-Nohemi text-text-color overflow-y-scroll h-fit">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Sloth Airdrop Roadmap
      </h1>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phase 1: Launch</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Minibot announcement on Telegram</li>
          <li>Initial community building</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phase 2: Airdrop Event</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Provide daily tasks for additional rewards</li>
          <li>Engage with community through polls and quizzes</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phase 3: Token Utility and Growth</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Partnerships with other Telegram channels and bots</li>
          <li>Token staking and rewards programs</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phase 4: Community Expansion</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Host airdrop and events with influencers</li>
          <li>Reach more global Telegram groups</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phase 5: Airdrop Conclusion & Future Plans</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Wrap up airdrop distribution</li>
          <li>Analyze feedback from participants</li>
          <li>Plan future updates and community-driven features</li>
        </ul>
      </section>
    </div>
  );
};

export default Roadmap;
