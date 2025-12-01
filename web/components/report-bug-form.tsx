'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useReportBug } from '@/features/issues/hooks/use-report-bug'
import { useTranslation } from 'react-i18next'

type ReportBugFormProps = {
  featureId: string
  onSuccess?: () => void
}

export function ReportBugForm({ featureId, onSuccess }: ReportBugFormProps) {
  const { t } = useTranslation()
  const [issueText, setIssueText] = useState('')
  const { mutate: reportBug, isPending, isSuccess } = useReportBug()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!issueText.trim()) return

    reportBug(
      {
        feature_id: featureId,
        issue_text: issueText.trim(),
      },
      {
        onSuccess: () => {
          setIssueText('')
          onSuccess?.()
        },
      }
    )
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">{t('reportBug.success')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('reportBug.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="issue-text" className="sr-only">
              {t('reportBug.issueTextLabel')}
            </label>
            <textarea
              id="issue-text"
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder={t('reportBug.placeholder')}
              required
              rows={4}
              className="w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          <Button type="submit" disabled={isPending || !issueText.trim()}>
            {isPending ? t('common.loading') : t('reportBug.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

