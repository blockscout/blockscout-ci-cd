{{- define "adminRs_env" }}
{{- range $key, $value := .Values.adminRs.environment }}
{{- $item := get $.Values.adminRs.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}
