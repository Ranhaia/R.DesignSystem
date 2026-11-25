import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AnnouncementBanner } from "@/components/ui/announcement-banner"
import AnnouncementBannerDemo from "@/components/examples/announcement-banner-demo"

const meta: Meta<typeof AnnouncementBanner> = {
  title: "Organisms/Announcement Banner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof AnnouncementBanner>

export const Default: Story = {
  render: () => <AnnouncementBannerDemo />,
}

export const SemFechar: Story = {
  args: { dismissible: false, children: "Novo painel de relatórios disponível." },
}
