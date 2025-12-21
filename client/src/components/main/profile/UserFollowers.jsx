import React, { useContext, useMemo, useState } from "react";
import UserCard from "./UserCard";
import { UserFollowStats } from "./UserFollowStats";
import AuthContext from "../../../context/AuthContext";
import UIStateContext from "../../../context/UIStateContext";
import { matchUserSearch } from "../../../utils/search";
import PropTypes from "prop-types";

const PAGE_SIZE = 20;

export default function UserFollowers({ followers = [], isOwnProfile }) {
    
    const { searchQuery } = useContext(UIStateContext);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filteredFollowers = useMemo(() => {
        if (!searchQuery) return followers;

        return followers.filter(({ user }) =>
            matchUserSearch(user, searchQuery)
        );
    }, [followers, searchQuery]);

    const visibleFollowers = useMemo(() => {
        return filteredFollowers.slice(0, visibleCount);
    }, [filteredFollowers, visibleCount]);

    const stats = {
        total: followers.length,
        monthly: 12,
        growth: 12,
        activeRate: 82,
    };

    return (
        <div className="space-y-4 mt-4 md:mt-0">
            <UserFollowStats stats={stats} />

            <div className="grid gap-4">
                {visibleFollowers.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-10">
                        No followers found.
                    </div>
                ) : (
                    visibleFollowers.map(({ user }) => (
                        <UserCard
                            key={user?._id}
                            user={user}
                            isOwnProfile={isOwnProfile}
                        />
                    ))
                )}
            </div>

            {
                visibleCount < filteredFollowers?.length && <div className="flex">
                    <button onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredFollowers?.length))} className="text-sm mx-auto px-3 py-1.5 bg-orange-500 dark:bg-[#07C5B9] rounded-lg hover:opacity-80">
                        Load More
                    </button>
                </div>
            }
        </div>
    );
}

UserFollowers.propTypes = {
    followers: PropTypes.array.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
};
