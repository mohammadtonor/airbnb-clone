'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeaderButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
    listingId,
    currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

    return (
        <div
          onClick={toggleFavorite}
          className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
          "  
        >
            <AiOutlineHeart
                size={28}
                className="
                  fill-neutral-200
                  absolute
                  -top-[2px]
                  -right-[2px]

                "
            />

            <AiFillHeart
                size={24}
                className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
            />

        </div>
     );
}
 
export default HeaderButton;