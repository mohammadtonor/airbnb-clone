import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeaderButton from "../HeadingButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                ">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeaderButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
