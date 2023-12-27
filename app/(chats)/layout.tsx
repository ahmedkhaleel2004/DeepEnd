import NavbarSmall from "@/components/component/navbars/navbar-small";

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
