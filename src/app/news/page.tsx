import { redirect } from "next/navigation";

// 新闻页面暂时隐藏，访问时重定向到首页
export default function NewsPage() {
  redirect("/");
}
