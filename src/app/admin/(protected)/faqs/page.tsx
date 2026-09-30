import { CrudPage } from '@/components/admin/crud-page'; import { adminList } from '@/lib/admin/data'
export default async function Faqs() { return <CrudPage title="FAQs" description="Answer the questions guests ask most often." table="faqs" rows={await adminList('faqs')} returnTo="/admin/faqs" fields={[{key:'question',label:'Question'},{key:'answer',label:'Answer',type:'textarea'}]}/> }
