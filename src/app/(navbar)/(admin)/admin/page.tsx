import Sidebar from "@/components/sidebar";
import EditableLink from "@/components/ui/editable-link";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
    return (
        <div className="flex flex-row w-full h-[89vh]">
            <Sidebar active1={true} />
            <div className="flex flex-col gap-3 pt-2 p-[200px] h-full w-full">
                <EditableLink />
                <EditableLink />
                <EditableLink />
                <EditableLink />
                <EditableLink />
            </div>
            <Separator orientation="vertical" className="py-14 h-full" />
            <div className="w-[800px] h-full flex justify-center items-center p-5">
                <iframe
                    src="/"
                    width="325px"
                    height="650px"
                    className="ml-5 border-4 border-primary rounded-[2rem] shadow-xl shadow-accent"
                    allowFullScreen
                />
            </div>
        </div>
    )
}