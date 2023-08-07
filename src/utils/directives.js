import { Notification } from 'element-ui';
export const COPY = {
    bind(el, { value }) {
        el.$value = value
        el.handler = () => {
            if (!el.$value) {
                Notification.success({
                    title: '无复制内容'
                });
                return
            }
            const textarea = document.createElement('textarea')
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            textarea.value = el.$value
            document.body.appendChild(textarea)
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                Notification.success({
                    title: '复制成功'
                });
            }
            document.body.removeChild(textarea)
        }
        el.addEventListener('click', el.handler)
    },
    componentUpdated(el, { value }) {
        el.$value = value
    },
    unbind(el) {
        el.removeEventListener('click', el.handler)
    },
}