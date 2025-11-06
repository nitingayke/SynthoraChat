import React from 'react';
import { useLocation } from 'react-router-dom';
import OverallLeaders from './sections/OverallLeaders';
import AccuracyLeaders from './sections/AccuracyLeaders';
import SpeedLeaders from './sections/SpeedLeaders';
import AICollabLeaders from './sections/AICollabLeaders';
import RisingStars from './sections/RisingStars';

function Content() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'overall';

  const renderContent = () => {
    switch (activeTab) {
      case 'overall':
        return <OverallLeaders />;
      case 'accuracy':
        return <AccuracyLeaders />;
      case 'speed':
        return <SpeedLeaders />;
      case 'ai-collab':
        return <AICollabLeaders />;
      case 'rising':
        return <RisingStars />;
      default:
        return <OverallLeaders />;
    }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </div>
    </section>
  );
}

export default Content;