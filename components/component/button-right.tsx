import { FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function ButtonIcon() {
	return (
		<Button variant="outline" size="icon">
			<FaChevronRight className="h-4 w-4" />
		</Button>
	);
}
