import React, { useContext, useMemo, useState } from "react";
import UserCard from "./UserCard";
import { UserFollowStats } from "./UserFollowStats";
import UIStateContext from "../../../context/UIStateContext";
import { matchUserSearch } from "../../../utils/search";
import PropTypes from "prop-types";
import { computeFollowStats } from "../../../utils/followStats";

const PAGE_SIZE = 15;

export default function UserFollowing({ following = [] }) {

    const { debouncedSearchQuery } = useContext(UIStateContext);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);


    const filteredFollowing = useMemo(() => {

        if (!debouncedSearchQuery) return following;

        return following.filter(({ user }) =>
            matchUserSearch(user, debouncedSearchQuery)
        );
    }, [following, debouncedSearchQuery]);

    const visibleFollowing = useMemo(() => {
        return filteredFollowing.slice(0, visibleCount);
    }, [filteredFollowing, visibleCount]);

    const stats = useMemo(() => {
        return computeFollowStats(following);
    }, [following]);

    return (
        <div className="space-y-4 mt-4 md:mt-0">

            <UserFollowStats stats={stats} />

            <div className="grid gap-4">
                {
                    visibleFollowing?.length === 0 ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-10">
                            You are not following anyone yet.
                        </div>
                    ) : (
                        visibleFollowing?.map(({ user, followedAt }) => (
                            <UserCard
                                key={user?._id}
                                user={user}
                                followedAt={followedAt}
                                mode="following"
                            />
                        ))
                    )
                }
            </div>

            {
                visibleCount < filteredFollowing?.length && <div className="flex">
                    <button onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredFollowing?.length))} className="text-sm mx-auto px-3 py-1.5 bg-orange-500 dark:bg-[#07C5B9] rounded-lg hover:opacity-80">
                        Load More
                    </button>
                </div>
            }
        </div>
    );
}

UserFollowing.propTypes = {
    following: PropTypes.array.isRequired,
};

