import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, getApiErrorMessage } from "../services/interview.api"
import { useCallback, useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports, error, setError } = context

    const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        setError("")

        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            setError(getApiErrorMessage(error))
            return null
        } finally {
            setLoading(false)
        }
    }, [ setError, setLoading, setReport ])

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        setError("")

        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            setReport(null)
            setError(getApiErrorMessage(error))
            return null
        } finally {
            setLoading(false)
        }
    }, [ setError, setLoading, setReport ])

    const getReports = useCallback(async () => {
        setLoading(true)
        setError("")

        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            setReports([])
            setError(getApiErrorMessage(error))
            return []
        } finally {
            setLoading(false)
        }
    }, [ setError, setLoading, setReports ])

    const getResumePdf = useCallback(async (interviewReportId) => {
        setLoading(true)
        setError("")

        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        }
        catch (error) {
            setError(getApiErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }, [ setError, setLoading ])

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ getReportById, getReports, interviewId ])

    return { loading, error, report, reports, generateReport, getReportById, getReports, getResumePdf }

}
