
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card, { type CardProps } from "../Card/Card";

interface SortableCardProps {
    card: CardProps;
    disabled?: boolean;
    reorderMode: boolean;
}

const SortableCard: React.FC<SortableCardProps> = ({
    card,
    disabled = false,
    reorderMode,
}) => {
    const navigate = useNavigate();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        disabled,
    });

    const isReordering = reorderMode && !disabled;

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "transform 200ms ease",
        opacity: isDragging ? 0.4 : 1,
        cursor: isReordering ? "grab" : "pointer",
        width: "100%",
        height: "auto",
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isReordering || isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        navigate(`/card/${card.id}`);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(isReordering ? listeners : {})}
            onClick={handleClick}
        >
            <Card
                {...card}
                reorderMode={isReordering}
            />
        </div>
    );
};

export default SortableCard;