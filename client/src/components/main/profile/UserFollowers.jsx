import React, { useContext, useMemo, useState } from "react";
import UserCard from "./UserCard";
import { UserFollowStats } from "./UserFollowStats";
import UIStateContext from "../../../context/UIStateContext";
import { matchUserSearch } from "../../../utils/search";
import { computeFollowStats } from "../../../utils/followStats";
import PropTypes from "prop-types";

const PAGE_SIZE = 20;

export default function UserFollowers({ followers = [] }) {

    const { debouncedSearchQuery } = useContext(UIStateContext);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filteredFollowers = useMemo(() => {
        if (!debouncedSearchQuery) return followers;

        return followers.filter(({ user }) =>
            matchUserSearch(user, debouncedSearchQuery)
        );
    }, [followers, debouncedSearchQuery]);

    const visibleFollowers = useMemo(() => {
        return filteredFollowers.slice(0, visibleCount);
    }, [filteredFollowers, visibleCount]);

    const stats = useMemo(() => {
        return computeFollowStats(followers);
    }, [followers]);

    return (
        <div className="space-y-4 mt-4 md:mt-0">
            <UserFollowStats stats={stats} />

            <div className="grid gap-4">
                {visibleFollowers.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-10">
                        No followers found.
                    </div>
                ) : (
                    visibleFollowers.map(({ user, followedAt }) => (
                        <UserCard
                            key={user?._id}
                            user={user}
                            followedAt={followedAt}
                            mode="followers"
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
};
