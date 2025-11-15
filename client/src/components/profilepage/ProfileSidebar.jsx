import QuickActions from './sidebar/QuickActions ';
import AISummaryCard from './sidebar/AISummaryCard';
import ConnectionsSection from './sidebar/ConnectionsSection';


const ProfileSidebar = () => {

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="space-y-6">
      <QuickActions itemVariants={itemVariants} />
      <AISummaryCard itemVariants={itemVariants} />
      <ConnectionsSection itemVariants={itemVariants} />
    </div>
  );
};

export default ProfileSidebar;