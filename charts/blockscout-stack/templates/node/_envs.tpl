{{- define "node_env" }}
{{- range $key, $value := .Values.node.environment }}
{{- $item := get $.Values.node.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}

{{- define "node_common_env" }}
{{- range $key, $value := .Values.node.environmentCommon }}
{{- $item := get $.Values.node.environmentCommon $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}

{{- define "node_dtl_env" }}
{{- range $key, $value := .Values.node.dtl.environment }}
{{- $item := get $.Values.node.dtl.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}

{{- define "node_healthcheck_env" }}
{{- range $key, $value := .Values.node.healthcheck.environment }}
{{- $item := get $.Values.node.healthcheck.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}
