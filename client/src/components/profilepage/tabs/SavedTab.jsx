import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PropTypes from "prop-types";
import {
  Bookmark
} from 'lucide-react';

export default function SavedTab({tabVariants}) {

    return (
      <motion.div
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Saved Posts</h3>
          <p className="text-gray-600 dark:text-gray-400">Posts you've saved will appear here</p>
        </div>
      </motion.div>
    )

}

SavedTab.propTypes = {
  tabVariants: PropTypes.object.isRequired,
};
