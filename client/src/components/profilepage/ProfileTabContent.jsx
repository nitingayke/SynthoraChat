import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import OverviewTab from './tabs/OverviewTab ';
import QuestionsTab from './tabs/QuestionsTab';
import AnswersTab from './tabs/AnswersTab';
import AIChatsTab from './tabs/AIChatsTab';
import SavedTab from './tabs/SavedTab';
import ActivityTab from './tabs/ActivityTab';

const ProfileTabContent = ({ activeTab, user }) => {
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };
  return (
    <AnimatePresence mode="wait">
      {activeTab === 'overview' && (
        <OverviewTab tabVariants={tabVariants} user={user} />
      )}
      {activeTab === 'questions' && (
        <QuestionsTab tabVariants={tabVariants} />
      )}
      {activeTab === 'answers' && (
        <AnswersTab tabVariants={tabVariants} />
      )}
      {activeTab === 'ai-chats' && (
        <AIChatsTab tabVariants={tabVariants} />
      )}
      {activeTab === 'saved' && (
        <SavedTab tabVariants={tabVariants} />
      )}
      {activeTab === 'activity' && (
        <ActivityTab tabVariants={tabVariants} />
      )}
    </AnimatePresence>
  );
};

ProfileTabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileTabContent;