<template>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
        <n-loading-bar-provider>
            <n-dialog-provider>
                <n-notification-provider>
                    <n-message-provider>
                        <RouterView></RouterView>
                    </n-message-provider>
                </n-notification-provider>
            </n-dialog-provider>
        </n-loading-bar-provider>
        <NGlobalStyle />
    </NConfigProvider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
</script>
