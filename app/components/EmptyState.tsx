'use client';

import { useRouter } from "next/navigation";
import Heading from "./modals/Heading";
import Button from "./Button";

interface EmptyStateProps{
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exct maches',
    subtitle = 'try changing or removing of your filters',
    showReset
}) => {
    const router = useRouter()
    return ( 
        <div
          className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
          "
        >
            <Heading 
              center
              title={title}
              subtitle={subtitle}    
            />

            <div className="w-48 mt-4">
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            </div>
        </div>
     );
}
 
export default EmptyState;