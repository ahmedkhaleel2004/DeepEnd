import NavbarSmall from "@/components/component/navbar-small";

interface ChatLayoutProps {
	children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<div>
			<NavbarSmall />
			{children}
		</div>
	);
}
